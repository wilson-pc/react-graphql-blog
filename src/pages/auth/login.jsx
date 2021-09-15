import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../mutations/user';
import { useDispatch } from 'react-redux';
import { login } from '../../store/auth/action';
import { useHistory } from 'react-router-dom';
export function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [addLogin, { data, loading, error }] = useMutation(LOGIN_USER);

  async function saveData(e) {
    e.preventDefault();
    var formData = new FormData(e.target);

    const { email, password } = Object.fromEntries(formData.entries());

    try {
      const {
        data: { login: lg },
      } = await addLogin({
        variables: { login: { email: email, password: password } },
      });
      dispatch(login(lg));
      history.push('/');
    } catch (error) {
      console.log(error);
    }
    // dispatch(add(2))
    //  setAuthCount({ email: email, password: password });
  }
  return (
    <div className='container center'>
      <div className='row'>
        <div className='col-sm-9 col-md-7 col-lg-5 mx-auto'>
          <div className='card border-0 shadow rounded-3 my-5'>
            <div className='card-body p-4 p-sm-5'>
              <h5 className='card-title text-center mb-5 fw-light fs-5'>
                login
              </h5>
              <form onSubmit={saveData}>
                <div className='form-floating mb-3'>
                  <input
                    type='email'
                    className='form-control'
                    id='floatingInput'
                    name='email'
                    placeholder='name@example.com'
                  />
                  <label htmlFor='floatingInput'>Email address</label>
                </div>
                <div className='form-floating mb-3'>
                  <input
                    type='password'
                    className='form-control'
                    name='password'
                    id='floatingPassword'
                    placeholder='Password'
                  />
                  <label htmlFor='floatingPassword'>Password</label>
                </div>

                <div align='center' className='d-grid center'>
                  {loading ? (
                    <div
                      align='center'
                      className='spinner-border text-primary center text-center'
                      role='status'
                    >
                      <span className='visually-hidden'>Loading...</span>
                    </div>
                  ) : null}
                  <button
                    className='btn btn-primary btn-login text-uppercase fw-bold'
                    type='submit'
                    disabled={loading ? true : false}
                  >
                    Sign in
                  </button>
                  <pre>
                    {error
                      ? error.graphQLErrors.map(({ message }, i) => (
                          <span key={i}>{message}</span>
                        ))
                      : null}
                  </pre>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
