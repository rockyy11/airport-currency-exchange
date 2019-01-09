import AdminSettings from '../data/AdminConfiguration'

const adminAPIHelper = {
  async getAdminSettings () {
    return new Promise((resolve) => {
      resolve(AdminSettings)
    })
  }
}

export default adminAPIHelper
