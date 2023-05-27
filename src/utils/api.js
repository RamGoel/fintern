import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { checkValidObj, generateKey, getErrMessage } from "./plugins";
import { getDoc, setDoc, doc, getDocs, collection, query, updateDoc } from "firebase/firestore";

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
export const applyForPosting = (userId, postingId, handler, errHandler) => {
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

    setDoc(docRef, { ...data, applicants: {}, key: key })
        .then(res => handler(res, key))
        .catch(err => errHandler(getErrMessage(err)))
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
export const getAllPostingsByReviewer = async (reviewerId, handler, errHandler) => {
    var allPostings = []
    const q = query(collection(db, "postings"));
    await getDocs(q).then(querySnapshot => {
        querySnapshot.forEach((doc) => {
            var posting1 = doc.data()
            if (posting1.actor.userId===String(reviewerId)) {
                allPostings.push(doc.data())
            }

        })
        console.log(allPostings)
    }).catch(err => errHandler(getErrMessage(err)))
    handler(allPostings)
}

