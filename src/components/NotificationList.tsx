import React, { useEffect, useState } from "react";
import styled from "styled-components";
import API from "../api/axios";
import { BASE_URL } from "../env";

interface Notification {
  notificationId: number;
  message: string;
  type: string;
  paramId: number;
  startNotification: string;
  isRead: boolean;
}

interface NotificationListProps {
  onBack: () => void;
}

const NotificationList: React.FC<NotificationListProps> = ({ onBack }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchNotifications = async (page: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get(`${BASE_URL}/api/notification`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          size: 10,
        },
      });
      setNotifications(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications(currentPage);
  }, [currentPage]);

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/api/notification/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications((prev) => prev.filter((notif) => notif.notificationId !== id));
      alert("알림이 삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting notification:", error);
      alert("알림 삭제에 실패했습니다.");
    }
  };

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <Container>
      <Title>알림 리스트</Title>
      <List>
        {notifications.map((notification) => (
          <NotificationItem key={notification.notificationId}>
            <Message>{notification.message}</Message>
            <DeleteButton onClick={() => handleDelete(notification.notificationId)}>
              x
            </DeleteButton>
          </NotificationItem>
        ))}
      </List>
      <Pagination>
        <PageButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          이전
        </PageButton>
        <PageIndicator>
          {currentPage + 1} / {totalPages}
        </PageIndicator>
        <PageButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage + 1 === totalPages}
        >
          다음
        </PageButton>
      </Pagination>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  font-size: 0.9vw;
  font-weight: bold;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NotificationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  border: #c1c1c1 solid 0.5px;
  font-size: 0.7vw;
  cursor: pointer;
`;

const Message = styled.div`
  flex: 1;
`;

const DeleteButton = styled.button`
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  margin: 0 10px;
  border: none;
  background-color: #fff;
  cursor: pointer;
  font-size: 0.8vw;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const PageIndicator = styled.span`
  font-size: 0.8vw;
`;

export default NotificationList;
