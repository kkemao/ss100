const productConfig = {
  mysql: {
    port: 3306,
    host: '192.168.13.88',
    user: 'root',
    password: 'introcks1234',
    database: 'demo', // 库名
    connectionLimit: 10, // 连接限制
  },
  redis: {
    port: '32079',
    host: '192.168.13.88',
    db: '0',
    password: 'intellif',
  },
};

const localConfig = {
  // mysql: {
  //   port: 32000,
  //   host: '192.168.13.88',
  //   user: 'root',
  //   password: 'introcks1234',
  //   database: 'demo', // 库名
  //   connectionLimit: 10, // 连接限制
  // },
  mysql: {
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'introcks1234',
    database: 'demo', // 库名
    connectionLimit: 10, // 连接限制
  },
  redis: {
    port: '6379',
    host: '127.0.0.1',
    db: '0',
    password: 'intellif',
  },
  // redis: {
  //   port: '32079',
  //   host: '192.168.13.88',
  //   db: '0',
  //   password: 'intellif',
  // },
};

// 本地运行是没有 process.env.NODE_ENV 的，借此来区分[开发环境]和[生产环境]
const config = process.env.NODE_ENV ? productConfig : localConfig;

export default config;
