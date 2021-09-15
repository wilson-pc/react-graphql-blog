import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../queries/Posts';

export function Home() {
  const { loading, error, data } = useQuery(GET_POSTS);
  console.log(loading);
  return (
    <div className='container'>
      <div className='row justify-content-center row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 '>
        {!loading
          ? data.posts.map((element, index) => (
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
                    <h6 className='card-subtitle mb-2 text-muted'>
                      Author: {element.author.email}
                    </h6>
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

                    <a href='#' className='btn btn-primary'>
                      Ver completo
                    </a>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
