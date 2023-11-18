import PropTypes from "prop-types";
import useUser from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { styled } from "styled-components";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
ProtectedRoute.propTypes = {
  children: PropTypes.any,
};

function ProtectedRoute({ children }) {
  const { isLoading, error, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isLoading, error, isAuthenticated, navigate]
  );

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  // if (error) return navigate("/login");

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
