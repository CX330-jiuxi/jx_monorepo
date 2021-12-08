import './App.less';
import rootStore from './store';
import { Button, Form, Input, message } from 'antd';

const { usePicker } = rootStore;

function App() {
  const { user, userDispatch } = usePicker(['user', 'userDispatch']);

  function onFinish(payload: typeof user) {
    userDispatch({ type: 'update', payload });
    message.success('保存成功').then();
  }

  return (
    <div className="App">
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

export default App;
