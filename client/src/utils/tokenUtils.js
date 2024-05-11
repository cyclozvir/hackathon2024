// tokenUtils.js

export const checkTokens = async () => {
    const storedAccessToken = localStorage.getItem('jwt_access');
    const storedRefreshToken = localStorage.getItem('jwt_refresh');

    if (!storedAccessToken) {
        console.log('trying refresh')
      const refreshedTokens = await refreshTokens(storedRefreshToken);
      if (refreshedTokens.isValid) {
        return { isValid: true, accessToken: refreshedTokens.accessToken };
      } else {
        return { isValid: false };
      }
    }
  
    return { isValid: true, accessToken: storedAccessToken };
};
  
const refreshTokens = async (refreshToken) => {
    if (refreshToken) {
      
        try {
        const response = await fetch('http://64.226.118.188:8000/api/v1/token/refresh/', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({refresh: refreshToken}),
        });
        if (response.ok) {

            const updatedTokens = await response.json()
            localStorage.setItem('jwt_access', updatedTokens.access);
			localStorage.setItem('jwt_refresh', updatedTokens.refresh);

          return { isValid: true, accessToken: '' }; 
        } else {
          console.log('Error validating refresh token:', response.statusText);
          return { isValid: false };
        }
      } catch (error) {
        console.error('Error validating refresh token:', error);
        return { isValid: false };
      }
    } else {
      console.log('No refresh token available.');
      return { isValid: false };
    }
};