export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'default_fallback_secret',
  expiresIn: process.env.JWT_EXPIRES_IN || '1h', // ejemplo: '3600s' o '1h'
};
