import { connect } from 'react-redux';
import ListUser from 'src/components/ListUser';
import { fetchUsers } from 'src/actions/user';

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  users: state.user.list,
  pagination: state.user.pagination,
  isLogged: state.login.logged,
});

const mapDispatchToProps = (dispatch) => ({
  loadUsers: (search, sortBy, order, page) => {
    dispatch(fetchUsers(search, sortBy, order, page));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListUser);
