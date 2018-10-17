// var requirejs = require('requirejs');
//
//
// const bindActionCreators = require('redux').bindActionCreators;
// const routerActions = require('react-router-redux').routerActions;
//
// const navigate = {
//     to: function(where) {
//         return routerActions.push(where);
//     },
//
//     back: function() {
//         return routerActions.goBack();
//     },
//
//     bind: function(store) {
//         navigate.to = bindActionCreators(navigate.to, store.dispatch);
//         navigate.back = bindActionCreators(navigate.back, store.dispatch);
//     }
// };
//
// module.exports = navigate;