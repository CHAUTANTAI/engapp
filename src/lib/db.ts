import sql from 'mssql';

const config = {
  user: 'taihoccode', // Thay bằng tên người dùng SQL Server của bạn
  password: '13162002Ko.', // Thay bằng mật khẩu của người dùng SQL Server
  server: 'DESKTOP-G8V90SS', // Tên máy chủ SQL Server
  database: 'db_eng', // Tên cơ sở dữ liệu
  options: {
    encrypt: false, // Đặt là true cho môi trường sản xuất nếu sử dụng mã hóa
    trustServerCertificate: true, // Cho phép chứng chỉ tự ký
  },
};

// Caching the SQL Server connection for reuse
let cachedConnection: sql.ConnectionPool | null = null;

export async function getDbConnection() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    console.log('Attempting to connect to the database...');
    cachedConnection = await sql.connect(config);
    console.log('Database connection established');
    return cachedConnection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw new Error('Failed to connect to the database');
  }
}
