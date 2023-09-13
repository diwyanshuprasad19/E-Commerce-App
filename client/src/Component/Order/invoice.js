import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Axios  from 'axios';
import '../../css/Order/invoice.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';








const generatePDF = () => {
    const input = document.getElementById('invoice-content');
  
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      let  k =1;
      if(window.width <=900)
      {
        k=2;
      }
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height*k * pdfWidth) / imgProps.width;
  
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('invoice.pdf');
    });
  };

  const printContent = () => {
    const content = document.getElementById('invoice-content');
    const printWindow = window.open('', '_blank');
    printWindow.document.write(content.innerHTML);
    printWindow.document.close();
    printWindow.print();
  };



function Invoice() {

  const { id } = useParams();
  const [list123,setlist123] = useState({});
  const [error,seterror] = useState('');
  const email ='diwyanshu.prasad@gmail.com';
  const token = localStorage.getItem('Customer-token');



    const oneDigit = [
      '',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
    ];
  
    const twoDigit = [
      'Ten',
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen',
    ];
  
    const tensMultiple = [
      '',
      '',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety',
    ];
  
    const convertToWords = (num) => {
      if (num === 0) {
        return 'Zero Rupees';
      }
  
      const oneToWords = (num) => {
        if (num === 0) {
          return '';
        } else if (num < 10) {
          return oneDigit[num];
        } else if (num < 20) {
          return twoDigit[num - 10];
        } else {
          return tensMultiple[Math.floor(num / 10)] + ' ' + oneDigit[num % 10];
        }
      };
  
      if (num < 100) {
        return oneToWords(num) + ' Rupees';
      } else if (num < 1000) {
        return oneToWords(Math.floor(num / 100)) + ' Hundred ' + oneToWords(num % 100) + ' Rupees';
      } else {
        return 'Number out of range';
      }
    };




  useEffect(() => {
    Axios.post('http://localhost:3001/vieworderwithid',{
      token:token,
      id:id,
     }).then(res=>{
       if(res.data.type ==='Success')
       {
           setlist123(res.data.items);
       }
     else if(res.data.type ==='error')
     {
          seterror(res.data.errors);
     }
 }).catch(err =>{
   console.log(err);
 });
  }, [list123]);







const handletotal =(list123)=>{
  let total = list123.price * list123.quantity *(100-list123.discount)*0.01;
  return total;
}

const handlediscount =(list123)=>{
  let total = list123.price * list123.quantity *(list123.discount)*0.01;
  return total;
}

const handleword =(total)=>{
  const words = convertToWords(Math.round(total));;
  return words;
}


  return (
<>
<div className="invoice-box" id="invoice-content" >
      <table cellPadding="0" cellSpacing="0">
        <tr className="top_rw">
          <td colSpan={2}>
            <h2 style={{ marginBottom: '0px' }} className='set111'>
              Invoice(Original for Recipient)
            </h2>
            <span className='set222'>
            Invoice No:{list123._id}
            </span>
            {window.innerWidth<600 &&  
                        <span className='set222'>
                      <br/>OrderId:#{list123.orderid}
                        </span>
                        }
          </td>

{window.innerWidth>=600 &&          
<td style={{ width: '30%', marginRight: '10px' }} className='set333'>
            OrderId:#{list123.orderid}
          </td>}



        </tr>
        <tr className="top">
          <td colSpan={2}>
            <table>
              <tr>
                <td>
                  <b> Sold By: Publix Enterprise</b> <br />
                  Viraj khand,Gomti Nagar<br />
                  Lucknow, UP - 226010<br />
                  India <br />
                  +0651-908-090-009<br />
                  PAN: AALFN0535C <br />
                  GSTIN: 27AALFN0535C1ZK <br />
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr className="information">
          <td colSpan={3}>
            <table>
              <tr>
                <td colSpan={2}>
                  <b> Shipping Address:</b> <br />
                  {list123.shipname}<br />
                   {list123.address}
                </td>
                <td>
                  <b> Billing Address:</b>
                  <br />
                  {list123.shipname}<br />
                  {list123.address}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td colSpan={3}>
            <table cellSpacing="0" cellPadding="2">
              <tr className="heading">
                <td style={{ width: '25%' }}> ITEM </td>
                <td style={{ width: '10%', textAlign: 'center' }}> QTY. </td>
                <td style={{ width: '10%', textAlign: 'right' }}>
                  UNIT PRICE(₹)
                </td>
                <td style={{ width: '15%', textAlign: 'right' }}>
                  SUB TOTAL (₹)
                </td>
                <td style={{ width: '15%', textAlign: 'right' }}>
                DISCOUNT (%)
                </td>
                <td style={{ width: '15%', textAlign: 'right' }}>
                  TOTAL AMOUNT (₹)
                </td>
              </tr>
              <tr className="item">
                <td style={{ width: '25%' }}>
                  {list123.name}(Type:{list123.type})
                </td>
                <td style={{ width: '10%', textAlign: 'center' }}> {list123.quantity} </td>
                <td style={{ width: '10%', textAlign: 'right' }}> {list123.price} </td>
                <td style={{ width: '15%', textAlign: 'right' }}> {list123.price*list123.quantity} </td>
                <td style={{ width: '15%', textAlign: 'right' }}> {list123.discount}% </td>
                <td style={{ width: '15%', textAlign: 'right' }}> {handletotal(list123)} </td>
              </tr>
              <tr className="item">
                <td style={{ width: '25%' }}> <b> Grand Total </b> </td>
                <td style={{ width: '10%', textAlign: 'center' }}></td>
                <td style={{ width: '10%', textAlign: 'right' }}> </td>
                <td style={{ width: '15%', textAlign: 'right' }}> </td>
                <td style={{ width: '15%', textAlign: 'right' }}>₹{handlediscount(list123)} </td>
                <td style={{ width: '15%', textAlign: 'right' }}> {handletotal(list123)} </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr className="total">
          <td colSpan={2} align="right">
            Total Amount in Words :{' '}
            <b> {handleword(handletotal(list123))} </b>
          </td>
        </tr>
        <tr>
          <td colSpan={3}>
            <table cellSpacing="0px" cellPadding="2px">
              <tr>
                <td width="50%">
                  <b> Declaration: </b> <br />
                  We declare that this invoice shows the actual price of
                  the goods described above and that all particulars are
                  true and correct. The goods sold are intended for end
                  user consumption and not for resale.
                </td>
                <td>
                  * This is a computer generated invoice and does not
                  require a physical signature
                </td>
              </tr>
              <tr>
                <td width="50%"></td>
                <td>
                  <b> Authorized Signature </b>
                  <br />
                  <br />
                  
                 <div className="signature">Publix</div>
                 
                  ...................................
                  <br />
                  <br />
                  <br />
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>

    <div class="button-container1">
    <button class="print-button" onClick={printContent}>Print</button>
    <button class="download-button" onClick={generatePDF}>Download</button>
</div>

</>
  );
}

export default Invoice;