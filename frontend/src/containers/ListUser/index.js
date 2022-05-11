import { connect } from 'react-redux';
import ListUser from 'src/components/ListUser';
import { fetchUsers } from 'src/actions/user';

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  users: state.user.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadUsers: (sortBy, order) => {
    dispatch(fetchUsers(sortBy, order));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListUser);
