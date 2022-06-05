export const getAddedListingIds = () => {
  const addedListingIds = localStorage.getItem('added_listings')
    ? JSON.parse(localStorage.getItem('added_listings'))
    : [];

  return addedListingIds;
};

export const addListingIds = (listingIdArr) => {
  if (listingIdArr.length) {
    localStorage.setItem('added_listings', JSON.stringify(listingIdArr));
  } else {
    localStorage.removeItem('added_listings');
  }
};

export const removeBookId = (bookId) => {
  const addedListingIds = localStorage.getItem('added_listings')
    ? JSON.parse(localStorage.getItem('added_listings'))
    : null;

  if (!addedListingIds) {
    return false;
  }

  const updatedAddedListingIds = addedListingIds?.filter((addedListingId) => addedListingId !== bookId);
  localStorage.setItem('added_listings', JSON.stringify(updatedAddedListingIds));

  return true;
};
