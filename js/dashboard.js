// Verifyin if user is login
if (!localStorage.getItem('jwt')) {
    location.assign('../index.html')
}
