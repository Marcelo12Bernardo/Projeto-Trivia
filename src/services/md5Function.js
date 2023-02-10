import md5 from 'crypto-js/md5';

const getGravatarEmail = (email) => md5(email).toString();

export default getGravatarEmail;
