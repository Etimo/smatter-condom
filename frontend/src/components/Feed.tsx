import { useAutoAnimate } from "@formkit/auto-animate/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { Endpoints, useSmatterQuery } from "../api";
import type { Post } from "../types/spec";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import {
  GiftIcon,
  HeartIcon,
  ImageIcon,
  MessageCircleIcon,
  RepeatIcon,
  SmileIcon,
  UploadIcon,
  VoteIcon,
} from "./ui/icons";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";

const Feed = () => {
  const query = useSmatterQuery(Endpoints.posts.get);
  const [parent] = useAutoAnimate();

  if (query.error) {
    return <p>Error: {query.error.message}</p>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <MakeSmat />
          <ol className="space-y-4" ref={query.data ? parent : null}>
            {query.isPending ? (
              <>
                <SkeletonSmat />
                <SkeletonSmat />
                <SkeletonSmat />
              </>
            ) : (
              <>
                {query.data.map((x) => (
                  <li key={x.id}>
                    <Smat post={x} />
                  </li>
                ))}
              </>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Feed;

const formSchema = z.object({
  content: z.string().min(2).max(200),
});

const MakeSmat = () => {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const mutation = useMutation({
    mutationFn: Endpoints.posts.create.request,
    onSuccess: () => {
      form.reset();
      void queryClient.invalidateQueries({ queryKey: Endpoints.posts.get.key });
      toast({
        description: "You just shared your thoughts with the world 😻",
        title: "Success!",
      });
    },
  });

  const onSubmit = form.handleSubmit(async (data) => mutation.mutate(data));

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4"
        >
          <div className="flex items-start gap-4">
            <Avatar className="w-10 h-10 rounded-full">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Hello world!" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button variant="ghost" size="sm">
                  <ImageIcon className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  <GiftIcon className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  <VoteIcon className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  <SmileIcon className="w-5 h-5" />
                </Button>
                <Button size="sm">Smat</Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

type SmatProps = {
  post: Post;
};

const Smat = (props: SmatProps) => {
  return (
    <Card className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
      <div className="flex items-start gap-4">
        <Avatar className="w-10 h-10 rounded-full">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold">Acme Inc</span>
            <span className="text-gray-500 dark:text-gray-400">@acmeinc</span>
            <span className="text-gray-500 dark:text-gray-400">· 3h</span>
          </div>
          <p className="mt-2">{props.post.content}</p>
          <div className="flex items-center gap-4 mt-2">
            <Button variant="ghost" size="icon">
              <MessageCircleIcon className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <RepeatIcon className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <HeartIcon className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <UploadIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const SkeletonSmat = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
