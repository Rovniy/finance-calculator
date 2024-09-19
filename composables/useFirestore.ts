import {
    collection,
    deleteDoc,
    doc,
    endBefore,
    getCountFromServer,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter
} from "firebase/firestore"
import {addDoc, setDoc} from "@firebase/firestore";

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
                console.error(`Error getting document: ${e.message}`);
            }
        },
        addDocument: async (path, docObj) => {
            const {$firestoreDb} = useNuxtApp();

            try {
                const addedDoc = await addDoc(collection($firestoreDb, path), {
                    ...docObj,
                });
                await setDoc(
                    doc($firestoreDb, path, addedDoc.id),
                    {id: addedDoc.id},
                    {merge: true}
                );
                console.log(`Document Added!`);
            } catch (e) {
                console.error(`Error writing document: ${e.message}`);
            }
        },
        deleteDocument: async (path, documentId) => {
            try {
                const {$firestoreDb} = useNuxtApp();
                const docRef = doc($firestoreDb, path, documentId)

                await deleteDoc(docRef)
                console.log(`Документ с ID ${documentId} успешно удален.`)
            } catch (e) {
                console.error(`Error getting document: ${e.message}`);
            }
        },
        countDocuments: async path => {
            try {
                const {$firestoreDb} = useNuxtApp();
                const transactionsRef = collection($firestoreDb, path)

                let q = query(transactionsRef)

                const snapshot = await getCountFromServer(q);

                return snapshot.data().count
            } catch (e) {
                console.error(`Error getting document count. Reason: ${e.message}`);
            }
        }
    }
}