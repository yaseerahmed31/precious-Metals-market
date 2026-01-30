import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { OrderDetails } from '../types';

export const createOrder = async (userId: string, orderDetails: OrderDetails) => {
    try {
        const orderData = {
            ...orderDetails,
            userId,
            createdAt: serverTimestamp(),
            status: 'confirmed', // Immediate confirmation for demo
        };

        // Convert Date objects to strings or timestamps if needed for Firestore, 
        // but Firestore handles Date objects by converting to Timestamp.
        // However, orderDetails.product might contain complex objects. 
        // We should flatten or clean it if necessary. 
        // For now, storing as is should work if logical structure is clean.

        const docRef = await addDoc(collection(db, 'orders'), orderData);
        return { id: docRef.id, ...orderData };
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export const getUserOrders = async (userId: string) => {
    try {
        const q = query(
            collection(db, 'orders'),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};
