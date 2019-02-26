export default function ({ store, redirect, route }) {
  if (store.state.user != null && disabledForUser(route)) redirect('/')
  else if (store.state.user == null && disabledForAnonymous(route)) redirect('/login')
}

function disabledForUser(route) {
  if (route.matched.some(record => record.path === '/login' || record.path === '/sign-up')) {
    return true
  }
}

function disabledForAnonymous(route) {
  if (route.matched.some(record => record.path === '/new')) {
    return true
  }
}
