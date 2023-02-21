//firebase.js
import firebase from "firebase/compat/app"
import 'firebase/compat/firestore';

import { getAuth } from "firebase/auth";

const firebaseConfig = {
    // firebase 설정과 관련된 개인 정보
    apiKey: "AIzaSyBNi_t7jS_JgFIvtxdpJFJGjWK7p1bsXyw",
    authDomain: "pagelist-8ea82.firebaseapp.com",
    projectId: "pagelist-8ea82",
    storageBucket: "pagelist-8ea82.appspot.com",
    messagingSenderId: "275224397523",
    appId: "1:275224397523:web:3b462ecd8b3caf6508b626",
    measurementId: "G-GCYEG8PFGD"
};

// firebaseConfig 정보로 firebase 시작
const app = firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();
const auth = getAuth(app);

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore, auth};
