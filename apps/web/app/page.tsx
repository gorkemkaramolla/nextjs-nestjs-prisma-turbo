'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  Badge,
  Button,
  Checkbox,
  Input,
  Label,
  MaxWidthWrapper,
  NumberStepper,
  ProgressBar,
  ProgressCircle,
  RadioGroup,
  RadioGroupItem,
  Slider,
  StatusBadge,
  Switch,
  TooltipProvider,
} from '@repo/ui';
import { FunnelChart } from '@repo/ui/charts';
import { Github, Twitter, YouTube } from '@repo/ui/icons';
import { fetcher } from '@repo/utils';
import { useState } from 'react';
import useSWR from 'swr';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export default function UiShowcasePage() {
  const [switchChecked, setSwitchChecked] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [stepperValue, setStepperValue] = useState(10);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const { data: users, error, isLoading } = useSWR<User[]>(
    `${apiUrl}/api/users`,
    fetcher
  );

  return (
    <TooltipProvider>
      <div className="bg-neutral-50 min-h-screen">
        <MaxWidthWrapper className="py-12 space-y-16">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
              NEXTJS & NESTJS & PRISMA & TAILWIND & DUB UI
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
              A comprehensive showcase of the components, typography, and visual
              style used throughout the application.
            </p>
          </div>

          {/* Buttons Section */}
          <section className="space-y-6 p-6 bg-white rounded-xl border border-neutral-200 shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900 border-b border-neutral-100 pb-4">
              Buttons
            </h2>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary" text="Primary Button" />
              <Button variant="secondary" text="Secondary Button" />
              <Button variant="outline" text="Outline Button" />
              <Button variant="danger" text="Danger Button" />
              <Button variant="danger-outline" text="Danger Outline" />
              <Button variant="success" text="Success Button" />
              <Button variant="primary" loading text="Loading" />
              <Button
                variant="secondary"
                icon={<Github className="size-4" />}
                text="GitHub"
              />
            </div>
          </section>

          {/* Form Elements Section */}
          <section className="space-y-6 p-6 bg-white rounded-xl border border-neutral-200 shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900 border-b border-neutral-100 pb-4">
              Form Elements
            </h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-neutral-700">Input Field</Label>
                  <Input placeholder="Enter text here..." />
                </div>
                <div className="space-y-2">
                  <Label className="text-neutral-700">Number Stepper</Label>
                  <NumberStepper
                    value={stepperValue}
                    onChange={setStepperValue}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-neutral-700">
                    Slider ({sliderValue}%)
                  </Label>
                  <Slider
                    value={sliderValue}
                    onChange={setSliderValue}
                    min={0}
                    max={100}
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg border border-neutral-100 bg-neutral-50/50">
                  <Label className="text-neutral-700 cursor-pointer">
                    Toggle Switch
                  </Label>
                  <Switch checked={switchChecked} fn={setSwitchChecked} />
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg border border-neutral-100 bg-neutral-50/50">
                  <Checkbox id="chk1" />
                  <Label
                    htmlFor="chk1"
                    className="text-neutral-700 cursor-pointer"
                  >
                    Accept Terms & Conditions
                  </Label>
                </div>
                <div className="space-y-3">
                  <Label className="text-neutral-700">Radio Group</Label>
                  <RadioGroup defaultValue="1" className="gap-3">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="1" id="r1" />
                      <Label
                        htmlFor="r1"
                        className="cursor-pointer text-neutral-600"
                      >
                        Default Option
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="2" id="r2" />
                      <Label
                        htmlFor="r2"
                        className="cursor-pointer text-neutral-600"
                      >
                        Alternative Option
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </section>

          {/* Badges & Visuals Section */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6 p-6 bg-white rounded-xl border border-neutral-200 shadow-sm">
              <h2 className="text-xl font-semibold text-neutral-900 border-b border-neutral-100 pb-4">
                Badges
              </h2>
              <div className="flex flex-wrap gap-3">
                <Badge variant="neutral">Neutral</Badge>
                <Badge variant="blue">Blue</Badge>
                <Badge variant="green">Green</Badge>
                <Badge variant="amber">Amber</Badge>
                <Badge variant="violet">Violet</Badge>
                <Badge variant="black">Black</Badge>
                <Badge variant="rainbow">Rainbow</Badge>
              </div>
              <div className="flex flex-wrap gap-3">
                <StatusBadge variant="neutral">Neutral Status</StatusBadge>
                <StatusBadge variant="success">Success</StatusBadge>
                <StatusBadge variant="pending">Pending</StatusBadge>
                <StatusBadge variant="error">Error</StatusBadge>
                <StatusBadge variant="warning">Warning</StatusBadge>
              </div>
            </div>

            <div className="space-y-6 p-6 bg-white rounded-xl border border-neutral-200 shadow-sm">
              <h2 className="text-xl font-semibold text-neutral-900 border-b border-neutral-100 pb-4">
                Visual Indicators
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-neutral-600">
                    <span>Progress</span>
                    <span>60%</span>
                  </div>
                  <ProgressBar value={60} />
                </div>
                <div className="flex items-center gap-8 justify-center py-4">
                  <div className="flex flex-col items-center gap-2">
                    <ProgressCircle
                      progress={0.75}
                      className="size-12"
                      strokeWidth={10}
                    />
                    <span className="text-xs text-neutral-500 font-medium">
                      75% Complete
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar
                      user={{
                        name: 'User',
                        image:
                          'https://api.dicebear.com/9.x/avataaars/svg?seed=Felix',
                      }}
                      className="size-10"
                    />
                    <Avatar
                      user={{
                        name: 'Admin',
                        image:
                          'https://api.dicebear.com/9.x/avataaars/svg?seed=Aneka',
                      }}
                      className="size-10"
                    />
                    <Avatar user={{ name: 'Guest' }} className="size-10" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Charts Section */}
          <section className="space-y-6 p-6 bg-white rounded-xl border border-neutral-200 shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900 border-b border-neutral-100 pb-4">
              Data Visualization
            </h2>
            <div className="h-80 w-full">
              <FunnelChart
                steps={[
                  {
                    id: '1',
                    label: 'Impressions',
                    value: 12500,
                    colorClassName: 'text-blue-500',
                  },
                  {
                    id: '2',
                    label: 'Clicks',
                    value: 8400,
                    colorClassName: 'text-indigo-500',
                  },
                  {
                    id: '3',
                    label: 'Signups',
                    value: 4200,
                    colorClassName: 'text-violet-500',
                  },
                  {
                    id: '4',
                    label: 'Purchases',
                    value: 1800,
                    colorClassName: 'text-purple-500',
                  },
                ]}
              />
            </div>
          </section>

          {/* Content Section */}
          <section className="space-y-6 p-6 bg-white rounded-xl border border-neutral-200 shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900 border-b border-neutral-100 pb-4">
              Content & Layout
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is this design system?</AccordionTrigger>
                <AccordionContent>
                  This is a comprehensive UI kit built with React, Tailwind CSS,
                  and Radix UI, designed for building modern, accessible web
                  applications.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it customizable?</AccordionTrigger>
                <AccordionContent>
                  Yes, the components are built using Tailwind CSS utility
                  classes, making them highly customizable and easy to extend.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
                <AccordionContent>
                  The system includes built-in support for dark mode using
                  Tailwind's dark mode variants.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Icons Section */}
          <section className="space-y-6 p-6 bg-white rounded-xl border border-neutral-200 shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900 border-b border-neutral-100 pb-4">
              Icons
            </h2>
            <div className="flex flex-wrap gap-6 text-neutral-600">
              <Github className="size-8 hover:text-black transition-colors cursor-pointer" />
              <Twitter className="size-8 hover:text-blue-400 transition-colors cursor-pointer" />
              <YouTube className="size-8 hover:text-red-500 transition-colors cursor-pointer" />
            </div>
          </section>

          {/* Full Stack Integration Demo Section */}
          <section className="space-y-6 p-6 bg-white rounded-xl border border-neutral-200 shadow-sm">
            <div className="border-b border-neutral-100 pb-4">
              <h2 className="text-xl font-semibold text-neutral-900">
                Full Stack Integration Demo
              </h2>
              <p className="text-sm text-neutral-500 mt-2">
                Live data fetched from NestJS API → Prisma → MySQL
              </p>
            </div>

            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3 text-neutral-500">
                  <div className="size-5 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
                  <span>Loading users from API...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">
                  Failed to load users. Make sure the API server is running at{' '}
                  <code className="px-1 py-0.5 bg-red-100 rounded">
                    {apiUrl}
                  </code>
                </p>
              </div>
            )}

            {users && users.length > 0 && (
              <div className="grid md:grid-cols-2 gap-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="p-4 border border-neutral-200 rounded-lg hover:border-neutral-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar
                        user={{
                          name: user.name,
                          image: `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.id}`,
                        }}
                        className="size-12"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-neutral-900 truncate">
                          {user.name}
                        </h3>
                        <p className="text-sm text-neutral-500 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <Badge variant="neutral">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {users && users.length === 0 && !isLoading && (
              <div className="py-12 text-center">
                <p className="text-neutral-500">
                  No users found. Run{' '}
                  <code className="px-2 py-1 bg-neutral-100 rounded">
                    pnpm db:seed
                  </code>{' '}
                  to add sample data.
                </p>
              </div>
            )}
          </section>
        </MaxWidthWrapper>
      </div>
    </TooltipProvider>
  );
}
