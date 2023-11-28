import { useState } from 'react';
import './App.scss';
import cn from 'classnames';

import usersFromServer from './api/users';
import photosFromServer from './api/photos';
import albumsFromServer from './api/albums';

const preparedPhotos = photosFromServer.map(photos => {
  const albums = albumsFromServer.find(album => photos.albumId === album.id);
  const users = usersFromServer.find(user => user.id === albums.userId);

  return {
    ...photos,
    albums,
    users,
  };
});

function filteredPhotoList(photos, query, owner, selectedAlbums) {
  let preparedPhotoList = [...photos];

  preparedPhotoList = preparedPhotoList.filter(photo => (
    (!query || photo.title.toLowerCase().includes(query.toLowerCase().trim()))
    && (!owner || photo.albums.userId === owner)
    && (!selectedAlbums.length || selectedAlbums.includes(photo.albumId))
  ));

  return preparedPhotoList;
}

function sortedByOrder(list, sortBy) {
  const sortedList = [...list];

  switch (sortBy) {
    case 'id':
      sortedList.sort((a, b) => a.id - b.id);
      break;

    case 'photoName':
      sortedList.sort((a, b) => a.title.localeCompare(b.title));
      break;

    case 'albumName':
      sortedList.sort((a, b) => a.albums.title.localeCompare(b.albums.title));
      break;

    case 'userName':
      sortedList.sort((a, b) => a.users.name.localeCompare(b.users.name));
      break;

    default:
      break;
  }

  return sortedList;
}

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [albumsOwner, setAlbumsOwner] = useState('');
  const [selectedAlbums, setSelectedAlbums] = useState([]);
  const [sortBy, setSortBy] = useState('');

  const visiblePhotos = filteredPhotoList(
    preparedPhotos,
    searchQuery,
    albumsOwner,
    selectedAlbums,
  );
  const sortedPhotos = sortedByOrder(visiblePhotos, sortBy);

  const handleRemoveSearchQuery = () => {
    setSearchQuery('');
  };

  const handleAlbumClick = (albumId) => {
    setSelectedAlbums((prevSelectedAlbums) => {
      if (prevSelectedAlbums.includes(albumId)) {
        return prevSelectedAlbums.filter((id) => id !== albumId);
      }

      return [...prevSelectedAlbums, albumId];
    });
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Photos from albums</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                href="#/"
                onClick={() => {
                  setAlbumsOwner('');
                }}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  href="#/"
                  key={user.id}
                  className={cn({ 'is-active': albumsOwner === user.id })}
                  onClick={() => {
                    if (albumsOwner !== user.id) {
                      setAlbumsOwner(user.id);
                    }
                  }}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={event => setSearchQuery(event.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {searchQuery && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      type="button"
                      className="delete"
                      onClick={handleRemoveSearchQuery}
                    />
                  </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                className={cn('button button is-success mr-6', {
                  'is-outlined': selectedAlbums === '',
                })}
                onClick={() => {
                  setSelectedAlbums([]);
                }}
              >
                All
              </a>

              {albumsFromServer.map(album => (
                <a
                  className={cn('button', {
                    'mr-2 my-1 is-info': selectedAlbums.includes(album.id),
                  })}
                  href="#/"
                  key={album.id}
                  onClick={() => handleAlbumClick(album.id)}
                >
                  {album.title}
                </a>
              ))}
            </div>

            <div className="panel-block">
              <a
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => {
                  setSelectedAlbums([]);
                  setAlbumsOwner('');
                  setSearchQuery('');
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            {visiblePhotos.length === 0
              && ('No photos matching selected criteria')}
          </p>

          <table
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    ID

                    <a href="#/" onClick={() => handleSortChange('id')}>
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Photo name

                    <a href="#/" onClick={() => handleSortChange('photoName')}>
                      <span className="icon">
                        <i className="fas fa-sort-down" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Album name

                    <a href="#/" onClick={() => handleSortChange('albumName')}>
                      <span className="icon">
                        <i className="fas fa-sort-up" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    User name

                    <a href="#/" onClick={() => handleSortChange('userName')}>
                      <span className="icon">
                        <i className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {sortedPhotos.map(photo => (
                <tr key={photo.id}>
                  <td className="has-text-weight-bold">
                    {photo.id}
                  </td>

                  <td>{photo.title}</td>
                  <td>{photo.albums.title}</td>

                  <td className={cn(photo.users.sex === 'm'
                    ? 'has-text-link'
                    : 'has-text-danger')}
                  >
                    {photo.users.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
