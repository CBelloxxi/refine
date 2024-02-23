import CurrentUser from "./current-user"
import { Layout, Space } from "antd";

const header = () => {

  const headerStyles = {
    background: '#fff',
  }

  return (
    <Layout.Header style={headerStyles}>
      <Space align="center" size="middle">
        <CurrentUser />
      </Space>
    </Layout.Header>
  )
}

export default header
