import React from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { GET_My_POSTS } from '../../queries';
import { Link } from 'react-router-dom';
import { DELETE_POST } from '../../mutations';

export function MyPosts() {
  const { loading, error, data } = useQuery(GET_My_POSTS);
  const [rmPost, { data: dat, loading: ld, error: er }] =
    useMutation(DELETE_POST);
  async function deletePost(id) {
    console.log(id);
    const r = window.confirm('confirm');

    if (r == true) {
      await rmPost({
        variables: {
          where: { id: id },
        },
        update(cache) {
          const normalizedId = cache.identify({ id, __typename: 'Post' });
          cache.evict({ id: normalizedId });
          cache.gc();
        },
      });
    }
  }

  return (
    <div className='container'>
      <div className='row justify-content-center row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 '>
        {!loading
          ? data.profile.posts.map((element, index) => (
              <div key={index} className='col mt-4'>
                <div className='card border-primary'>
                  <img
                    src={element.image}
                    width='400'
                    height='400'
                    className='img-thumbnailratio ratio-4x3'
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '200px',
                    }}
                    alt=''
                  />
                  <div className='card-body'>
                    <h5 className='card-title'>{element.title}</h5>

                    <p
                      className='card-text'
                      style={{
                        fontSize: '15px',
                        height: '150px',
                        overflow: 'hidden',
                        padding: '2px 5px',
                        whiteSpace: 'initial',
                      }}
                    >
                      {element.content}
                    </p>

                    <Link
                      to={{ pathname: '/update-post/' + element.id }}
                      className='btn btn-primary'
                    >
                      Edit
                    </Link>
                    <a
                      className='btn btn-danger'
                      onClick={() => deletePost(element.id)}
                    >
                      delete
                    </a>
                  </div>
                </div>
              </div>
            ))
          : null}
        {!loading && data.profile.posts.length === 0 ? (
          <h1>No hay posts creados</h1>
        ) : null}
      </div>
    </div>
  );
}
