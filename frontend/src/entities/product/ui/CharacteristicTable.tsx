import { IProduct } from "../model"


export const CharacteristicTable = ({products} : {products : IProduct[]}) => {
  const rows: Record<string, string[]> = {}
  products.forEach(product => {
    product.attributes.additional_info.forEach(info => {
      rows[info.description] = []
    })
    product.attributes.additional_info.forEach(info => {
      rows[info.description] = [...rows[info.description], info.value]
    })
  })

  return (
    <table>
      <tbody>
        {Object.keys(rows).map(rowKey => (
          <tr key={rowKey}>
            <td className="p-2 border-[1.5px] mb-2.5 font-bold text-lg">{rowKey}</td>
            {rows[rowKey].map((value, index) => (
              <td className="p-2 border-[1.5px] font-medium text-md" key={index}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}