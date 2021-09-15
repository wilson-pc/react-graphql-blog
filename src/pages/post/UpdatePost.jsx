import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { imageToBase64 } from '../../utils/image-to-base64';
import { CREATE_POST, UPDATE_POST } from '../../mutations';
import { GET_POST } from '../../queries';

export function UpdatePost() {
  let { id } = useParams();
  const [post, setPost] = useState({
    title: '',
    content: '',

    image: '',
    published: true,
  });
  const [image, setImage] = useState();
  const history = useHistory();
  const [updatePost, { data, loading, error }] = useMutation(UPDATE_POST);
  const {
    loading: ld,
    error: er,
    data: dat,
  } = useQuery(GET_POST, {
    variables: {
      where: { id: { equals: id } },
    },
  });

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    if (dat) {
      setPost({
        title: dat.post.title,
        content: dat.post.content,

        image: dat.post.image,
        published: dat.post.published,
      });
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
      if (!image) {
        delete post.image;
      }
      await updatePost({
        variables: {
          data: { ...post, image },
          where: { id: id },
        },
      });

      history.push('/my-posts');
    } catch (error) {}
  }
  return (
    <div className='container center'>
      <div className='row'>
        <div className='col-sm-9 col-md-7 col-lg-5 mx-auto'>
          <div className='card border-0 shadow rounded-3 my-5'>
            <div className='card-body p-4 p-sm-5'>
              <h5 className='card-title text-center mb-5 fw-light fs-5'>
                Update post
              </h5>

              <form onSubmit={saveData}>
                <div className='form-floating mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    id='title'
                    name='title'
                    placeholder='title'
                    value={post?.title || ''}
                    onChange={(e) => {
                      setPost((prevState) => ({
                        ...prevState,
                        title: e.target.value,
                      }));
                    }}
                  />
                  <label htmlFor='title'>title</label>
                </div>
                <div className='form-floating mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    id='floatingInput'
                    name='content'
                    placeholder='content'
                    value={post?.content || ''}
                    onChange={(e) => {
                      setPost((prevState) => ({
                        ...prevState,
                        content: e.target.value,
                      }));
                    }}
                  />
                  <label htmlFor='floatingInput'>content </label>
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

                <div className='form-check mb-3'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    value=''
                    id='published'
                    name='published'
                    checked={post.published}
                    onChange={(e) => {
                      setPost((prevState) => ({
                        ...prevState,
                        published: e.target.checked ? true : false,
                      }));
                    }}
                  />
                  <label className='form-check-label' htmlFor='published'>
                    public
                  </label>
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
                    Update
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
