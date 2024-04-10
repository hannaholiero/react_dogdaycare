import styled from "styled-components";

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);
  padding: 3rem 2rem 4rem;
  .form-title {
    margin-bottom: 2rem;
    text-align: center;
  }

  .form {
    width: 90vw;
    max-width: var(--fixed-width);
    background: var(--background-secondary-color);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);
    padding: 2rem 2.5rem;
    margin: 3rem auto;
  }
  .form-img {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    margin-top: 0;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-radio {
    display: flex;
  }
  .form-center {
    display: grid;
    row-gap: 1rem;
  }
  .form-btn {
    align-self: end;
    margin-top: 1rem;
    display: grid;
    place-items: center;
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  .form-label {
    display: block;
    font-size: var(--small-text);
    margin-bottom: 0.75rem;
    letter-spacing: var(--letter-spacing);
    line-height: 1.5;
  }
  .form-input,
  .form-textarea,
  .form-select {
    width: 100%;
    padding: 0.375rem 0.75rem;
    border-radius: var(--border-radius);
    background: var(--background-color);
    border: 1px solid var(--primary-300);
    color: var(--text-color);
  }
  .form-input,
  .form-select,
  .form-btn {
    height: 35px;
  }
  .form-row {
    margin-bottom: 1rem;
    margin-top: 1rem;
  }

  .form-textarea {
    height: 7rem;
  }
  ::placeholder {
    font-family: inherit;
    color: var(--primary-600);
    font-style: italic;
  }

  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }
  .radio-row {
    display: flex;
    flex-direction: row;
  }
  .radio {
    display: flex;
    width: 50%;
    flex-direction: column;
    margin: 10px;
  }
  .radio input {
    padding-bottom: 10px;
    margin-top: 0.5rem;
  }

  .checkbox {
    border-left: 2px solid var(--primary-500);
    padding: 10px;
    display: flex;
  }

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 1rem;
  }

  .title .logo {
    display: flex;
    height: 3em;
    margin: 0;
    padding-right: 1rem;
  }

  h4 {
    flex-direction: row;
    text-align: center;
    margin-bottom: 1.38rem;
  }
  p {
    margin-bottom: 1rem;
    text-align: start;
    line-height: 1.5;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }
`;
export default Wrapper;
