// Get user profile and recent searches
export const getUserProfile = async (request, response) => {
    try {
        const role = request.user.role;
        const recentSearchedCities = request.user.recentSearchedCities;
        response.json({ success: true, role, recentSearchedCities })
    } catch (error) {
        response.json({ success: false, message: error.message })
    }
}

// Add a new city to the user's recent search history
export const addRecentSearchCity = async (request, response) => {
    try {
        const { recentSearchedCities } = request.body;
        const user = await request.user;

        if (user.recentSearchedCities.length < 3) {
            user.recentSearchedCities.push(recentSearchedCities)
        } else {
            user.recentSearchedCities.shift();
            user.recentSearchedCities.push(recentSearchedCities)
        }

        await user.save();

        response.json({ success: true, message: "City Added." });
    } catch (error) {
        response.json({ success: false, message: error.message })

    }
}