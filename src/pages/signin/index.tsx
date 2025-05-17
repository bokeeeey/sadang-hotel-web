import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

import { auth, fireStore } from "@remote/firebase";
import { COLLECTIONS } from "@constants/collection";
import { Button, Flex, Text } from "@sadang-turtleneck-new-ui/ui";

function SigninPage() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider(); // provider 구글 설정

    try {
      const { user } = await signInWithPopup(auth, provider); // 팝업창 띄워서 로그인

      // 중복 체크
      const ref = await getDoc(
        doc(collection(fireStore, COLLECTIONS.USER), user.uid)
      );

      if (ref.exists() === true) {
        navigate("/");
        return;
      }

      // 새로운 유저
      const newUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoUrl:
          user.photoURL ||
          "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png",
      };

      await setDoc(
        doc(collection(fireStore, COLLECTIONS.USER), user.uid),
        newUser
      );

      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/cancelled-popup-request") {
          return;
        }
      }

      console.error(error);
    }
  };

  return (
    <Flex align="center" justify="center" direction="column">
      <Text bold={true}>Sadang Trip</Text>
      <Button onClick={handleGoogleLogin}>회원가입</Button>
    </Flex>
  );
}

export default SigninPage;
