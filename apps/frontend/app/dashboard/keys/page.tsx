"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Key,
  Plus,
  Copy,
  MoreVertical,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
  Check,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { GenerateApiKey, GetUserAPIkey } from "@/api/home/keys";
import { get } from "http";

export interface ApiKey {
  id: string;
  title: string;
  api_token: string;
  createdAt: string;
  updatedAt: string;
}

export default function KeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [newKeyName, setNewKeyName] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(false);
  const [apiKeyLoading, setApiKeyLoading] = useState<boolean>(true);

  const formatDateTime = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(date);
  };

  const handleCreateKey = async () => {
    setLoading(true);
    const newKey = await GenerateApiKey(newKeyName);
    if (newKey.success) {
      setCreatedKey(newKey.apikey || null);
      getUserAPI();
      setNewKeyName("");
      setLoading(false);
    } else {
      alert("Error");
      setLoading(false);
    }
    setLoading(false);
  };

  const handleCopyKey = async (key: string, id: string) => {
    await navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteKey = (id: string) => {
    setKeys(keys.filter((key) => key.id !== id));
  };

  const handleRevokeKey = (id: string) => {
    setKeys(
      keys.map((key) =>
        key.id === id ? { ...key, status: "revoked" as const } : key,
      ),
    );
  };

  const toggleKeyVisibility = (id: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(id)) {
      newVisible.delete(id);
    } else {
      newVisible.add(id);
    }
    setVisibleKeys(newVisible);
  };

  const closeCreateDialog = () => {
    setIsCreateOpen(false);
    setCreatedKey(null);
    setNewKeyName("");
  };

  const getUserAPI = async () => {
    try {
      setApiKeyLoading(true);
      const userKey = await GetUserAPIkey();
      if (userKey.success && userKey.apiKey) {
        setKeys(userKey.apiKey);
      }
    } finally {
      setApiKeyLoading(false);
    }
  };

  useEffect(() => {
    void getUserAPI();
  }, []);

  if (apiKeyLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">API Keys</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your API keys for authenticating requests.
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create New Key
            </Button>
          </DialogTrigger>
          <DialogContent>
            {!createdKey ? (
              <>
                <DialogHeader>
                  <DialogTitle>Create API Key</DialogTitle>
                  <DialogDescription>
                    Create a new API key to authenticate your requests.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Key Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Production API Key"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      A descriptive name to identify this key.
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={closeCreateDialog}>
                    Cancel
                  </Button>
                  {loading ? (
                    <Button>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </Button>
                  ) : (
                    <Button onClick={handleCreateKey}>Create Key</Button>
                  )}
                </DialogFooter>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-accent" />
                    API Key Created
                  </DialogTitle>
                  <DialogDescription>
                    Make sure to copy your API key now. You won&apos;t be able
                    to see it again.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
                    <code className="flex-1 break-all text-sm">
                      {createdKey}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCopyKey(createdKey, "new")}
                    >
                      {copiedId === "new" ? (
                        <Check className="h-4 w-4 text-accent" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="mt-4 flex items-start gap-2 rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <p className="text-sm text-yellow-500">
                      This key will only be shown once. Store it securely.
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={closeCreateDialog}>Done</Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Keys Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your API Keys</CardTitle>
          <CardDescription>
            {keys.length} key{keys.length !== 1 ? "s" : ""} created
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keys.map((apiKey) => (
                <TableRow key={apiKey.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Key className="h-4 w-4 text-muted-foreground" />
                      {apiKey.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="rounded bg-muted px-2 py-1 text-sm">
                        {visibleKeys.has(apiKey.id)
                          ? apiKey.api_token
                          : apiKey.api_token.substring(0, 12) + "..."}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                      >
                        {visibleKeys.has(apiKey.id) ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          handleCopyKey(apiKey.api_token, apiKey.id)
                        }
                      >
                        {copiedId === apiKey.id ? (
                          <Check className="h-4 w-4 text-accent" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{formatDateTime(apiKey.createdAt)}</TableCell>
                  <TableCell>{formatDateTime(apiKey.updatedAt)}</TableCell>
                  {/* <TableCell>
                    <Badge
                      variant={
                        apiKey.status === "active" ? "default" : "secondary"
                      }
                    >
                      {apiKey.status}
                    </Badge>
                  </TableCell> */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleRevokeKey(apiKey.id)}
                        >
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Regenerate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDeleteKey(apiKey.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-yellow-500/50 bg-yellow-500/5">
        <CardContent className="flex items-start gap-4 pt-6">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          <div>
            <h3 className="font-semibold text-yellow-500">
              Keep your keys secure
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Never share your API keys or commit them to version control. Use
              environment variables to store them securely. If you suspect a key
              has been compromised, revoke it immediately.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
