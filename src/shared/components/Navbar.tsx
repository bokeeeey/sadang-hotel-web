import { Link, useLocation } from "react-router-dom";
import { useAtomValue } from "jotai";
import { useResetAtom } from "jotai/utils";
import { useCallback } from "react";
import { userAtom } from "@atoms/user";
import { getAuth, signOut } from "firebase/auth";
import { Button, Flex, Text } from "@sadang-turtleneck-new-ui/ui";

function Navbar() {
  const location = useLocation();
  const showSignButton = ["/signin"].includes(location.pathname) === false;

  const user = useAtomValue(userAtom);
  const resetUser = useResetAtom(userAtom);

  const handleSignout = useCallback(async () => {
    const auth = getAuth();
    await signOut(auth);
    resetUser();
  }, [resetUser]);

  const renderButton = useCallback(() => {
    if (user != null) {
      return <Button onClick={handleSignout}>로그아웃</Button>;
    }

    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      );
    }

    return null;
  }, [user, showSignButton, handleSignout]);

  return (
    <Flex
      justify="between"
      align="center"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "var(--adaptiveBackground)",
        padding: "10px 24px",
        borderBottom: "1px solid var(--adaptiveGrey100)",
      }}
    >
      <Link to="/">
        <Text bold={true} size="t5">
          SadangUI
        </Text>
      </Link>
      {renderButton()}
    </Flex>
  );
}
export default Navbar;
