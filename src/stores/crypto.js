import { defineStore } from 'pinia'
import axios from 'axios'

export const useCryptoStore = defineStore('crypto', {
  state: () => ({
    crypto: [],
  }),
  actions: {
    async fetchCurrency() {
      try {
        const [currencyRes, marketRes] = await Promise.all([
          axios.get('https://requestly.tech/api/mockv2/test/api/currency?username=user26614&'),
          axios.get('https://requestly.tech/api/mockv2/test/api/market?username=user26614&'),
        ])

        const currencyData = currencyRes.data
        const marketData = marketRes.data

        const mergedArr = (currencyData, marketData) => {
          return marketData.map((el) => {
            const data = currencyData.find(
              (obj) => obj.code.toLowerCase() === el.pair.primary.toLowerCase(),
            )
            return {
              ...el,
              icon: data ? data.icon : null,
            }
          })
        }

        this.crypto = mergedArr(currencyData, marketData)
        console.log(this.crypto)
      } catch (error) {
        console.error('Ошибка загрузки крипты:', error)
      }
    },
  },
})
