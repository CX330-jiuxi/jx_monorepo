import './App.less';
import rootStore from './store';
import { Button, Form, Input, message } from 'antd';
import { memo } from 'react';

const { usePicker } = rootStore;

function App() {
  const { user, userDispatch } = usePicker(['user', 'userDispatch']);

  console.log('App render');

  function onFinish(payload: typeof user) {
    userDispatch({ type: 'update', payload });
    message.success('保存成功').then();
  }

  return (
    <div className="App">
      <Com />
      <Form style={{ width: '400px' }} onFinish={onFinish} initialValues={user}>
        <Form.Item label={'姓名'} name={'name'}>
          <Input placeholder={'姓名'} />
        </Form.Item>
        <Form.Item label={'年龄'} name={'age'}>
          <Input placeholder={'年龄'} />
        </Form.Item>
        <Form.Item label={'身高'} name={'height'}>
          <Input placeholder={'身高'} />
        </Form.Item>
        <Form.Item label={'地址'} name={'address'}>
          <Input placeholder={'地址'} />
        </Form.Item>
        <Form.Item>
          <Button htmlType={'submit'}>保存</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

const Com = memo(function () {
  // const { user } = usePicker(['user', 'userDispatch']);
  console.log('render');
  return <div>com</div>;
});

export default App;
