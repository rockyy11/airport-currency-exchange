import AdminSettings from '../data/AdminConfiguration'

const adminAPIHelper = {
  async getAdminSettings () {
    // TODO: Call API to fetch the admin settings
    return new Promise((resolve) => {
      resolve(AdminSettings)
    })
  },
  async updateAdminSettings (updatedSettings) {
    // TODO: Call API to update the admin settings
    return new Promise((resolve) => {
      resolve(updatedSettings)
    })
  }
}

export default adminAPIHelper
