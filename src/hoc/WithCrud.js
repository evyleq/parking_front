import React from 'react'
import axios from 'axios'

export default function (WrappedComponent, url) {

    return class WithCrud extends React.Component {

        crud_create = (data) => {
            return axios.post('/' + url, data);
        }

        crud_read = (id) => {
            return axios.get('/' + url + (id ? '/' : '') + (id || ''))
        }

        crud_update = (id, data) => {
            return axios.put('/' + url + '/' + (id || ''), data);
        }

        crud_delete = (id) => {
            return axios.delete('/' + url + '/' + id);
        }

        render() {
            return <WrappedComponent
                props={this.props}
                create={this.crud_create}
                delete={this.crud_delete}
                read={this.crud_read}
                update={this.crud_update}
            />
        }
        
    }
}