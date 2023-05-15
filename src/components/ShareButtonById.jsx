import React, { useState } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareSVG from '../images/shareIcon.svg';

const LINK_COPIED_MESSAGE_TIME = 4000;

function ShareButtonById({ testId, id, type }) {
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const handleShareButton = () => {
    const URL = `http://${window.location.href.split('/')[2]}/${type}s/${id}`;
    copy(URL);
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), LINK_COPIED_MESSAGE_TIME);
  };

  return (
    <div className="mr-1 pt-[0.35rem]">
      <button
        onClick={ handleShareButton }
        type="button"
        data-testid={ testId }
        src={ shareSVG }
      >
        <img src={ shareSVG } alt="share" />
      </button>
      {isLinkCopied && <p>Link copied!</p>}
    </div>
  );
}

ShareButtonById.propTypes = {
  testId: PropTypes.string,
}.isRequired;

export default ShareButtonById;
