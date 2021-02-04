import React, { useEffect } from 'react';
import Spinner from '../../UI/Spinner/Spinner';
import PostItem from '../../UI/PostItem/PostItem';
import { connect } from 'react-redux';
import { loadPostById } from '../../../actions/posts';
import PropTypes from 'prop-types';

const Post = ({ loadPostById, post, loading, match }) => {
  useEffect(() => {
    loadPostById(match.params.postId);
  }, [loadPostById, match.params.postId]);

  return (
    <>
      {loading && <Spinner />}
      {!loading && post && <PostItem full={true} {...post} />}
    </>
  );
};

Post.propTypes = {
  loadPostById: PropTypes.func.isRequired,
  post: PropTypes.object,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  post: state.posts.post,
  loading: state.posts.loading
});

export default connect(mapStateToProps, { loadPostById })(Post);
