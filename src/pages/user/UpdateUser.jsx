import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { imageToBase64 } from '../../utils/image-to-base64';
import { UPDATE_USER } from '../../mutations';
import { GET_PROFILE } from '../../queries/user';
export function UpdateUser() {
  const [image, setImage] = useState();
  const [name, setName] = useState('');
  const history = useHistory();
  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER);
  const { data: dat } = useQuery(GET_PROFILE);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    if (dat) {
      setName(dat.profile.name);
    }
  }, [dat]);

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

    try {
      await updateUser({
        variables: {
          data: { name: name, image },
          where: { id: auth.user.sub },
        },
      });

      history.push('/');
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
                Edit User
              </h5>

              <form onSubmit={saveData}>
                <div className='form-floating mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    id='name'
                    name='name'
                    placeholder='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label htmlFor='name'>name</label>
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
                    Save
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
