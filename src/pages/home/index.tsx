import { DashboardTotalCountCard, DealsChart, LatestActivities, UpcomingEvents } from "@/components";
import { DASHBOARD_TOTAL_COUNTS_QUERY } from "@/graphql/queries";
import { useCustom, CustomResponse, HttpError} from "@refinedev/core";
import { Col, Row } from "antd";
import { DocumentNode } from "graphql";

// Define the data that it is importing and using
interface DashboardTotalCounts {
  companies: {
    totalCount: number;
  };
  contacts: {
    totalCount: number;
  };
  deals: {
    totalCount: number;
  };
}

//Create a custom response and error handle the gql data shape and packet
export const Home = () => {
    const { data, isLoading } = useCustom<CustomResponse<DashboardTotalCounts>, CustomHttpError, unknown, unknown, DashboardTotalCounts>({
    url: '',
    method: 'get',
    meta: {
      gqlQuery: DASHBOARD_TOTAL_COUNTS_QUERY as DocumentNode,
    }
  });

  // Define a custom error type that extends HttpError
interface CustomHttpError extends HttpError {
  message: string;
  statusCode: number;
}

// Render
  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} xl={8}>
          < DashboardTotalCountCard
            resource='companies'
            isLoading={isLoading}
            totalCount={data?.data.companies.totalCount}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard 
            resource="contacts"
            isLoading={isLoading}
            totalCount={data?.data.contacts.totalCount}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard 
            resource="deals"
            isLoading={isLoading}
            totalCount={data?.data.deals.totalCount}
          />
        </Col>
      </Row>
      <Row
        gutter={[32,32]}
        style={{
          marginTop: '32px'
        }}
      >
        <Col
          xs={24}
          sm={24}
          xl={8}
          style={{
            height: '460px'
          }}
        >
          <UpcomingEvents />
        </Col>
        <Col
          xs={24}
          sm={24}
          xl={16}
          style={{
            height: '460px'
          }}
        >
          <DealsChart />
        </Col>
      </Row>

      <Row
        gutter={[32, 32]}
        style={{
          marginTop: '32px',
        }}
      >
        <Col xs={24}>
          <LatestActivities />
        </Col>
      </Row>
    </div>
  )
}

export default Home
