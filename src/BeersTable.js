import React from 'react';
import { Table, Descriptions, Tag, Progress, Slider } from 'antd';

const { Column } = Table;

function expandedRowRender({ name, description, ebc, srm, attenuation_level, brewers_tips }) {
  return (
    <Descriptions title={name}>
      <Descriptions.Item label="Description" span={3}>
        {description}
      </Descriptions.Item>
      <Descriptions.Item label="Tips" span={3}>
        {brewers_tips}
      </Descriptions.Item>
      <Descriptions.Item label="Attenuation level">{attenuation_level}</Descriptions.Item>
      <Descriptions.Item label="European Brewery Convention">{ebc}</Descriptions.Item>
      <Descriptions.Item label="Standard Reference Method">{srm}</Descriptions.Item>
    </Descriptions>
  );
}

function BeersTable({ beers, loading }) {
  return (
    <div className="BeersTable">
      <Table dataSource={beers} loading={loading} expandedRowRender={expandedRowRender} rowKey="id">
        <Column
          title="Beer"
          dataIndex="name"
          key="name"
          render={(name, { tagline, image_url }) => (
            <div className="BeersTable__media">
              <div
                className="BeersTable__media-image"
                style={{ backgroundImage: `url(${image_url})` }}
              />
              <div className="BeersTable__media-content">
                <div className="BeersTable__media-title">{name}</div>
                <div className="BeersTable__media-subtitle">{tagline}</div>
              </div>
            </div>
          )}
        />
        <Column title="% Alcool" dataIndex="abv" key="abv" render={abv => `${abv}%`} />
        <Column
          title="Bitterness"
          dataIndex="ibu"
          key="ibu"
          render={ibu =>
            !!ibu && <Progress percent={ibu} size="small" format={x => x} strokeColor="#BBB" />
          }
        />
        <Column title="First brewed" dataIndex="first_brewed" key="first_brewed" />

        <Column
          title="PH"
          dataIndex="ph"
          key="ph"
          width={120}
          render={ph => (
            <Slider
              range
              disabled
              defaultValue={[ph, ph]}
              min={0}
              max={14}
              marks={{ 0: '0', [ph]: ph, 14: '14' }}
              tooltipVisible={false}
            />
          )}
        />

        <Column
          title="Food pairing"
          dataIndex="food_pairing"
          key="food_pairing"
          render={food_pairing => (
            <span>
              {food_pairing.map(food => (
                <Tag color="blue" key={food}>
                  {food}
                </Tag>
              ))}
            </span>
          )}
        />
      </Table>
    </div>
  );
}

export default BeersTable;
