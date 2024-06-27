
import React, { useState, useRef } from 'react';
import "./SidebarAdmin.css";
import { PanelMenu } from 'primereact/panelmenu';
import { useNavigate } from 'react-router-dom';

export default function SidebarAdmin() {
    // const router = useRouter();
    const navigate = useNavigate();
    const items = [
        {
            label: 'Students',
            icon: 'pi pi-graduation-cap',
            command: () => {
                navigate('admin/students');
            }
        },
        {
            label: 'Teachers',
            icon: 'pi pi-users',
            command: () => {
                navigate('/admin/teachers');
            }
        },
        {
            label: 'Documents',
            icon: 'pi pi-book',
            items: [
                {
                    label: 'Category 1',
                    icon: 'pi pi-box',
                    command: () => {
                        navigate('/admin/documents/category-1');
                    }
                }, 
                {
                    label: 'Category 2',
                    icon: 'pi pi-box',
                    command: () => {
                        navigate('/admin/documents/category-2');
                    }
                }
            ]
        },
        {
            label: 'Questions',
            icon: 'pi pi-question-circle',
            items: [
                {
                    label: 'Grammar',
                    icon: 'pi pi-box',
                    items: [
                        {
                            label: 'Arrange sentence',
                            icon: 'pi pi-box',
                            command: () => {
                                navigate('/admin/questions/grammar/arrange-sentence');
                            }
                        },
                        {
                            label: 'Fill the gap',
                            icon: 'pi pi-box',
                            command: () => {
                                navigate('/admin/questions/grammar/fill-the-gap');
                            }
                        }
                    ]
                },
                {
                    label: 'Reading',
                    icon: 'pi pi-box',
                    items: [
                        {
                            label: 'Reading 1',
                            icon: 'pi pi-box',
                            command: () => {
                                navigate('/admin/questions/reading/1');
                            }
                        },
                        {
                            label: 'Images',
                            icon: 'pi pi-box',
                            command: () => {
                                navigate('/admin/questions/images/image');
                            }
                        },
                    ]
                }
            ]
        },
        {
            label: 'Tests',
            icon: 'pi pi-file-check',
            command: () => {
                navigate('/admin/tests');
            }
        },
        {
            label: 'Activities',
            icon: 'pi pi-twitter',
            command: () => {
                navigate('/admin/activities');
            }
        },
        {
            label: 'Stories',
            icon: 'pi pi-book',
            command: () => {
                navigate('/admin/stories');
            }
        },
    ]
    return (
        <div className="sidebar">
          <div className="sidebar-content">
            <PanelMenu model={items} className="w-full md:w-20rem" />
            
          </div>
        </div>
      )
}