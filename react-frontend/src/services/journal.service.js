//service that uses axios object above to send HTTP requests.
import http from "../http-common"

class JournalDataService {
   //methods for sending HTTP requests to the Apis
   getAll() {
      return http.get("/journals")
   }

   get(id) {
      return http.get(`/journals/${id}`)
   }

   create(data) {
      return http.post("/journals", data)
   }

   update(id, data) {
      return http.put(`/journals/${id}`, data)
   }

   delete(id) {
      return http.delete(`/journals/${id}`)
   }

   deleteAll() {
      return http.delete(`/journals`)
   }

   findByTitle(title) {
      return http.get(`/journals?title=${title}`)
   }
}

export default new JournalDataService()
