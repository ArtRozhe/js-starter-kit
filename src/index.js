import './index.scss';

import { getUsers, deleteUser } from './api/userApi';

getUsers().then(result => {
   let usersBody = '';

   result.forEach(user => {
      usersBody += `<tr><td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td><td>${user.id}</td><td>${user.name}</td>`;
   });

   global.document.getElementById('users').innerHTML = usersBody;

   const deleteLinks = global.document.getElementsByClassName('deleteUser');

   // Must use array.from to create a real array from a DOM collection
   // getElementByClassName only returns an "array like" object
   Array.from(deleteLinks, link => {
       link.onclick = function(event) {
           event.preventDefault();
           const element = event.target;
           deleteUser(element.attributes['data-id'].value);
           const row = element.parentNode.parentNode;
           row.parentNode.removeChild(row);
       }
   })
});
