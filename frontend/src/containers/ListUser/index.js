import { connect } from 'react-redux';
import ListUser from 'src/components/ListUser';
import { fetchUsers } from 'src/actions/user';

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  users: state.user.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadUsers: (search, sortBy, order) => {
    dispatch(fetchUsers(search, sortBy, order));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListUser);
