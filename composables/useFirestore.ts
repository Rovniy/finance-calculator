import {
    collection,
    deleteDoc,
    doc,
    endBefore,
    getCountFromServer,
    getDocs,
    limit,
    where,
    orderBy,
    query,
    startAfter
} from "firebase/firestore"
import { addDoc, setDoc } from "@firebase/firestore"

export default function () {
    return {
        getDocument: async (path, {
            targetDoc = null,
            forward = true,
            order = 'date',
            asc = 'desc',
            count = 3
        } = null) => {
            try {
                const {$firestoreDb} = useNuxtApp();
                const transactionsRef = collection($firestoreDb, path)

                let queryRequest = ''

                if (!targetDoc) {
                    queryRequest = query(transactionsRef, orderBy(order, asc), limit(count))
                } else if (forward) {
                    queryRequest = query(transactionsRef, orderBy(order, asc), startAfter(targetDoc), limit(count))
                } else {
                    queryRequest = query(transactionsRef, orderBy(order, asc), endBefore(targetDoc), limit(count))
                }

                const snapshot = await getDocs(queryRequest)

                const result = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))

                const first = snapshot.docs[0]
                const last = snapshot.docs[snapshot.docs.length - 1]

                return {
                    result,
                    last,
                    first
                }
            } catch (e) {
                console.error(`Error getting document: ${e.message}`)
            }
        },
        getDocumentByType: async (path, month, category = 'Dosug') => {
            const start = new Date(new Date().getFullYear(), month - 1, 1)
            const end = new Date(new Date().getFullYear(), month, 1)

            try {
                const {$firestoreDb} = useNuxtApp();
                const transactionsRef = collection($firestoreDb, path)

                const q = query(transactionsRef,
                    orderBy('date', 'desc'),
                    where('category', '==', category),
                    where('date', '>=', start),
                    where('date', '<', end))

                const snapshot = await getDocs(q)

                const result = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))

                return {
                    result
                }
            } catch (e) {
                console.error(`Error getting document: ${e.message}`)
            }
        },
        addDocument: async (path, docObj) => {
            const {$firestoreDb} = useNuxtApp()

            try {
                const addedDoc = await addDoc(collection($firestoreDb, path), {
                    ...docObj,
                })
                await setDoc(
                    doc($firestoreDb, path, addedDoc.id),
                    {id: addedDoc.id},
                    {merge: true}
                )
            } catch (e) {
                console.error(`Error writing document: ${e.message}`)
            }
        },
        deleteDocument: async (path, documentId) => {
            try {
                const {$firestoreDb} = useNuxtApp();
                const docRef = doc($firestoreDb, path, documentId)

                await deleteDoc(docRef)
            } catch (e) {
                console.error(`Error getting document: ${e.message}`)
            }
        },
        countDocuments: async path => {
            try {
                const { $firestoreDb } = useNuxtApp()
                const transactionsRef = collection($firestoreDb, path)

                let q = query(transactionsRef)

                const snapshot = await getCountFromServer(q)

                return snapshot.data().count
            } catch (e) {
                console.error(`Error getting document count. Reason: ${e.message}`)
            }
        },
        getStatsByMonth: async (path, month) => {
            const { $firestoreDb } = useNuxtApp()

            const start = new Date(new Date().getFullYear(), month - 1, 1)
            const end = new Date(new Date().getFullYear(), month, 1)

            const transactionsRef = collection($firestoreDb, 'transactions')
            const q = query(transactionsRef, where('date', '>=', start), where('date', '<', end))

            try {
                const snapshot = await getDocs(q)

                if (snapshot.empty) {
                    console.log('No matching documents.')
                    return {}
                }

                const categorySums = {}

                snapshot.forEach(doc => {
                    const data = doc.data()
                    const category = data.category || 'other'
                    const sum = data.sum || 0

                    if (!categorySums[category]) {
                        categorySums[category] = 0
                    }

                    categorySums[category] += sum
                })

                return categorySums
            } catch (error) {
                console.error('Error getting documents: ', error)
            }
        }
    }
}
