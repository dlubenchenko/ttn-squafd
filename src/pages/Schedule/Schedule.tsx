import { Table, Space, DatePicker } from "antd";
import styles from "./Schedule.module.scss";
import { cols as AntDCols, rows as AntDRows } from "../../helpers";
import { useAuthContext } from "../../context/AuthContext";
import { useScheduleData } from "../../hooks/useScheduleData";

export default function Schedule() {
  const { user } = useAuthContext();
  const {
    selectedDate,
    handleDateChange,
    days,
    weekdays,
    agentsWithSchedule,
    scheduleData,
    loading,
  } = useScheduleData();

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        {loading
          ? "Loading month..."
          : <DatePicker
              picker="month"
              value={selectedDate}
              onChange={handleDateChange}
              style={{ width: 160 }}
              allowClear={false}
            />}
      </Space>
      <Table
        columns={AntDCols(days, weekdays, styles)}
        dataSource={AntDRows(agentsWithSchedule, scheduleData, days, user)}
        pagination={false}
        bordered
        scroll={{ x: true }}
        rowKey="name"
        size="small"
        loading={loading}
      />
    </div>
  );
}
