import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { checkValidObj, generateKey, getErrMessage } from "./plugins";
import { getDoc, setDoc, doc, getDocs, collection, query, updateDoc, where } from "firebase/firestore";
import { storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const loginUser = (data, handler, errHandler) => {

    if (checkValidObj(data) === false) {
        alert("All Fields are compulsory.")
        return;
    }

    signInWithEmailAndPassword(auth, data.email, data.password).then(async result => {
        console.log(result)
        const docRef = doc(db, 'users', data.email)
        const docSnapp = await getDoc(docRef);
        if (docSnapp.exists()) {
            handler(docSnapp.data())
        } else {
            auth.signOut()
            errHandler("User Doesn't exists.")
        }
    }).catch(err => errHandler(getErrMessage(err)))

}
export const candidateSignup = (data, handler, errHandler) => {
    var key = generateKey()
    if (checkValidObj(data) === false) {
        alert("All Fields are compulsory.")
        return;
    }

    createUserWithEmailAndPassword(auth, data.email, data.password).then(result => {
        const docRef = doc(db, 'users', data.email)
        setDoc(docRef, { ...data, userId: key }).then(res => {
            handler({ ...data, userId: key })
        }).catch(err => {
            alert(getErrMessage(err))
        })
    }).catch(err => errHandler(getErrMessage(err)))
}
export const getAllPostings = async (handler, errHandler) => {
    var allPostings = []
    const q = query(collection(db, "postings"));
    await getDocs(q).then(querySnapshot => {
        querySnapshot.forEach((doc) => {
            allPostings.push(doc.data())
        })
    }).catch(err => errHandler(getErrMessage(err)))
    handler(allPostings)
}
export const applyForPosting = (userId,postingId, handler, errHandler) => {
    const docRef = doc(db, 'postings', postingId)
    getDoc(docRef).then(res => {
        const updatedApplicants = { ...res.data().applicants }
        updatedApplicants[userId] = true
        updateDoc(docRef, { applicants: updatedApplicants }).then(res => {
            handler(res)
        }).catch(err => {
            errHandler(getErrMessage(err))
        })
    })

    handler("success")
}
export const addNewPosting = async (data, handler, errHandler) => {

    if (checkValidObj(data) === false) {
        alert("All Fields are compulsory.")
        return;
    }

    const key = generateKey()
    const docRef = doc(db, 'postings', key)

    setDoc(docRef, { ...data, applicants: [], key: key }).then(res => handler(res, key)).catch(err => errHandler(getErrMessage(err)))
}
export const reviewerSignup = (data, handler, errHandler) => {
    if (checkValidObj(data) === false) {
        alert("All Fields are compulsory.")
        return;
    }

    createUserWithEmailAndPassword(auth, data.email, data.password).then(result => {
        const docRef = doc(db, 'users', data.email)
        setDoc(docRef, { ...data, role: 'reviewer', assigned: null }).then(res => handler(res)).catch(err => {
            alert(err.message)
        })
    }).catch(err => errHandler(err))
}


export const getConferenceById = async (id, handler, errHandler) => {
    const docRef = doc(db, 'conferences', id)
    getDoc(docRef).then(res => {
        if (res.exists) {
            handler(res.data())
        } else {
            handler(null)
        }
    }).catch(err => {
        errHandler(getErrMessage(err))
    })

}

export const enableCallForPapers = async (id, handler, errHandler) => {
    const docRef = doc(db, 'conferences', id)
    await updateDoc(docRef, {
        papers: {}
    }).then(res => {
        handler(res)
    }).catch(err => {
        errHandler(getErrMessage(err))
    })
}
export const getPapersById = async (id, handler, errHandler) => {
    const docRef = doc(db, 'conferences', id)

    getDoc(docRef).then(result => {
        handler(result.data())
    }).catch(err => errHandler(getErrMessage(err)))
}
export const getAllReviewer = async (handler, errHandler) => {
    const q = query(collection(db, "users"), where('role', '==', 'reviewer'));
    await getDocs(q).then(querySnapshot => {
        var allReviewers = []
        querySnapshot.forEach((doc) => {
            allReviewers.push(doc.data())
        })
        handler(allReviewers)
    }).catch(err => errHandler(getErrMessage(err)))
}
export const assignReviewer = async (email, paperId, confId, handler, errHandler) => {
    console.log('starting')
    const docRef = doc(db, 'conferences', confId)
    getDoc(docRef).then(res => {
        var allPapers = res.data().papers
        allPapers[paperId] = { ...allPapers[paperId], assigned: email }
        updateDoc(docRef, { papers: allPapers }).then(res => {
            handler(res)
        }).catch(err => errHandler(getErrMessage(err)))
    })

}
export const getAssignedPaper = async (email, handler, errHandler) => {
    var assignedPapers = []
    const q = query(collection(db, "conferences"));
    await getDocs(q).then(querySnapshot => {
        var allConferences = []
        querySnapshot.forEach((doc) => {
            allConferences.push(doc.data())
        })
        // eslint-disable-next-line
        allConferences.map(element => {
            if (element.papers !== false) {
                // eslint-disable-next-line
                element.papers.map(e => {
                    if (e.assigned === email) {
                        assignedPapers.push(e)
                    }
                })
            }
        })
        handler(assignedPapers)
    }).catch(err => errHandler(getErrMessage(err)))
}
export const getConferencesByEmail = async (email, handler, errHandler) => {
    var allConferences = []
    try {

        const q = query(collection(db, "conferences"), where('actor', '==', email));
        await getDocs(q).then(querySnapshot => {
            querySnapshot.forEach((doc) => {
                allConferences.push(doc.data())
            })
        }).catch(err => errHandler(getErrMessage(err)))
        handler(allConferences)
    } catch (e) {
        errHandler("Some Error Occured", e.message)
    }
}