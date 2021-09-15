import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { useHistory } from 'react-router-dom';
import { imageToBase64 } from '../../utils/image-to-base64';
import { REGISTER_USER } from '../../mutations';
export function Register() {
  const [image, setImage] = useState();
  const history = useHistory();
  const [addUser, { data, loading, error }] = useMutation(REGISTER_USER);

  async function loadImage(e) {
    const file = e.target.files[0];

    const imageSrc = await imageToBase64(file);
    const x = new Blob([imageSrc]).size;
    const fileSize = x / 1024 / 1024;

    setImage(imageSrc);
    if (fileSize > 4.5) {
      alert('file size is large');
    }
  }
  async function saveData(e) {
    e.preventDefault();
    var formData = new FormData(e.target);

    const { email, password, name } = Object.fromEntries(formData.entries());

    try {
      await addUser({
        variables: {
          data: { email: email, password: password, name: name, image: image },
        },
      });

      history.push('/login');
    } catch (error) {}
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
                Register
              </h5>

              <form onSubmit={saveData}>
                <div className='form-floating mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    id='name'
                    name='name'
                    placeholder='name'
                  />
                  <label htmlFor='name'>name</label>
                </div>
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
                <div className='form-floating mb-3'>
                  <input
                    type='file'
                    className='form-control'
                    name='image'
                    id='image'
                    accept='image/png, image/gif, image/jpeg'
                    placeholder='image'
                    onChange={loadImage}
                  />
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
                    Register
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
