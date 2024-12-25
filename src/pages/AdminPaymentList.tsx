import React, { useState } from "react";
import styled from "styled-components";
import paymentData from "../json/PaymentList.json";
import AdminBanner from "../components/AdminBanner";

const AdminPaymentList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const paymentsPerPage = 10;

  // Pagination logic
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = paymentData.PaymentList.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Root>
      <Container>
        <AdminBanner />

        <Title>결제 내역</Title>
        <Table>
          <thead>
            <tr>
              <TableHeader>ID</TableHeader>
              <TableHeader>멤버십 종류</TableHeader>
              <TableHeader>만료일</TableHeader>
              <TableHeader>결제 금액</TableHeader>
              <TableHeader>결제 일시</TableHeader>
            </tr>
          </thead>
          <tbody>
            {currentPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.membershipType}</TableCell>
                <TableCell>{payment.expirationDate}</TableCell>
                <TableCell>
                  {payment.paymentAmount.toLocaleString()}원
                </TableCell>
                <TableCell>
                  {new Date(payment.paymentDate).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>

        <Pagination>
          {Array.from(
            { length: Math.ceil(paymentData.PaymentList.length / paymentsPerPage) },
            (_, index) => (
              <PaginationButton
                key={index + 1}
                onClick={() => paginate(index + 1)}
                active={currentPage === index + 1}
              >
                {index + 1}
              </PaginationButton>
            )
          )}
        </Pagination>
      </Container>
    </Root>
  );
};

const Root = styled.div`
  padding-top: 20vh;
  display: flex;
  justify-content: center;
  height: 100vh;
`;

const Container = styled.div`
  width: 80%;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
  margin: 0 auto;
  font-size: 16px;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f4f4f4;
  font-weight: bold;
  text-align: left;
`;

const TableRow = styled.tr`
  background-color: white;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button<{ active: boolean }>`
  background-color: ${(props) => (props.active ? "#aa84c9;" : "white")};
  color: ${(props) => (props.active ? "white" : "black")};
  border: 1px solid #ddd;
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #e6f7ff;
  }
`;

export default AdminPaymentList;
