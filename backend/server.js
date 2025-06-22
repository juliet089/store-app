const express = require('express'); //подключаем библиотеку express для упрощения создания api
const server = express(); //создаём объект приложения
const cors = require('cors');
const session = require('express-session'); /*библиотека для создания сессий внутри приложения*/
const passport = require('passport');
const LocalStrategy = require('passport-local');

const authRouter = require('./routers/auth.router');
const productRouter = require('./routers/product.router');
const shoppingCartRouter = require('./routers/shopping-cart.router');

const userService = require('./services/user.service');

const { isAuthenticated } = require('./middleware/auth.middleware');

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};

server.use(express.json()); //устанавливаем автоматически парсинг тела запроса в json
server.use(cors(corsOptions));

// Middlewares, которые должны быть определены до passport:
server.use(express.urlencoded({ extended: true }));
server.use(session({
  secret: 'secret-keyasdas das dasd asd asd asd as',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    secure: false
  }
}));

// Подключение и настройка PassportJS:
server.use(passport.initialize());
server.use(passport.session());

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, userService.verifyUser));

passport.serializeUser((user, callback) => {
  callback(null, user.email);
});
passport.deserializeUser((email, callback) => {
  try {
    const foundedUser = userService.findUser({ email });
    callback(null, foundedUser);
  } catch (err) {
    callback(err);
  }
});

// Инициализация маршрутизаторов
server.use('/auth', authRouter);
server.use('/product', productRouter);
server.use('/shopping-cart', isAuthenticated, shoppingCartRouter);


// Запуск прослушивания обращений на localhost:3000
server.listen(3000, function() {
  console.log('Сервер ожидает подключения по адресу localhost:3000...');
});

module.exports = server;