const tableItem = {
  date: "2020-10-22",
  name: "吴盛东",
  phone: "18617081555",
  address: "浙江省杭州市西湖区"
}
const tableData = Array(20)
  .fill(tableItem)
  .map((x, i) => {
    return {id: i + 1, ...x}
  })
export default tableData;

